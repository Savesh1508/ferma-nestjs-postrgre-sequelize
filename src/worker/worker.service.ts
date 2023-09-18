import { HttpException, HttpStatus, BadRequestException, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { RoleService } from "src/roles/roles.service";
import { AddRoleWorkerDto } from "./dto/add-role.dto";
import { CreateWorkerDto } from "./dto/create-worker.dto";
import { UpdateWorkerDto } from "./dto/update-worker.dto";
import { Worker } from "./model/worker.model";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "src/mail/mail.service";
import { LoginWorkerDto } from "./dto/login-worker.dto";

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private workerRepo: typeof Worker,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
  ){}

  async createWorker(createWorkerDto:CreateWorkerDto, res: Response) {
    const worker = await this.workerRepo.findOne({
      where: { email: createWorkerDto.email },
    });
    if (worker) {
      throw new BadRequestException("Email already exists");
    }
    if (createWorkerDto.password !== createWorkerDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.workerRepo.create({
      ...createWorkerDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('MARKET');
    // const role = await this.roleService.getRoleByValue('ADMIN');
    // const role = await this.roleService.getRoleByValue('SUPERADMIN');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await worker.$set('roles', [role.id]);
    await worker.save();
    worker.roles = [role];

    const tokens = await this.getTokens(newWorker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();
    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newWorker.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendWorkerConfirmation(updateWorker[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    return newWorker;
  }

  async getAllWorkers():Promise<Worker[]> {
    const workers = await this.workerRepo.findAll({include: {all: true}});
    return workers;
  }

  async getWorkerById(id:number) {
    const worker = await this.workerRepo.findOne({where: {id}, include: {all: true}});
    return worker;
  }

  async getWorkerByEmail(email:string) {
    const worker = await this.workerRepo.findOne({where: {email}, include: {all: true}});
    return worker;
  }

  async updateWorkerById(id:number, updateWorkerDto:UpdateWorkerDto):Promise<Worker> {
    const worker = await this.workerRepo.update(updateWorkerDto, {where: {id}, returning: true});
    return worker[1][0].dataValues;
  }

  async deleteWorkerById(id:number) {
    const worker = await this.workerRepo.destroy({where: {id}})
    if (!worker) {
      throw new HttpException('Worker not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Worker has deleted!"};
  }

  async registration(createWorkerDto: CreateWorkerDto, res: Response) {
    const worker = await this.workerRepo.findOne({
      where: { email: createWorkerDto.email },
    });
    if (worker) {
      throw new BadRequestException("Email already exists");
    }
    if (createWorkerDto.password !== createWorkerDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.workerRepo.create({
      ...createWorkerDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('USER');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await newWorker.$set('roles', [role.id]);
    await newWorker.save();
    newWorker.roles = [role];

    const tokens = await this.getTokens(newWorker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();

    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newWorker.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendWorkerConfirmation(updateWorker[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: "Worker registred",
      worker: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    const { email, password } = loginWorkerDto
    const worker = await this.workerRepo.findOne({
      where: { email },
      include: ['roles'],
    });

    if (!worker) {
      throw new UnauthorizedException("Worker is not registered");
    }
    if (!worker.is_active) {
      throw new UnauthorizedException("Worker is not active");
    }
    const isMatchPass = await bcrypt.compare(password, worker.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Worker is not registered(pss)')
    }

    const tokens = await this.getTokens(worker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateWorker = await this.workerRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: worker.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Worker logged in",
      worker: updateWorker[1][0],
      tokens,
    };
    return response;
  }


  async logout(refreshToken: string, res: Response) {
    const workerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if (!workerData) {
      throw new ForbiddenException('Worker not found');
    }
    const updatedWorker = await this.workerRepo.update(
      {hashed_refresh_token: null},
      {where: {id: workerData.id}, returning: true}
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Worker logged out succesfully',
      worker: updatedWorker[1][0]
    };

    return response
  }

  async refreshToken(worker_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (worker_id != decodedToken['id']) {
      throw new BadRequestException('worker not found');
    }
    const worker = await this.workerRepo.findOne({where: {id: worker_id}});
    if (!worker || !worker.hashed_refresh_token) {
      throw new BadRequestException('Worker not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      worker.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(worker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateWorker = await this.workerRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: worker.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Worker logged in",
      worker: updateWorker[1][0],
      tokens,
    };

    return response;
  }

  async getTokens(worker: Worker) {
    if (!worker || !worker.roles || !Array.isArray(worker.roles)) {
      throw new BadRequestException('Invalid worker data');
    }

    const jwtpayload = {
      id: worker.id,
      is_active: worker.is_active,
      roles: worker.roles.map(role => role.value)
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_Token: accessToken,
      refresh_Token: refreshToken,
    };
  }

  async activate(link:string) {
    if(!link) {
      throw new BadRequestException('Activation link not found!');
    }

    const updatedWorker = await this.workerRepo.update(
      { is_active: true },
      { where: {activation_link: link, is_active: false}, returning: true }
    );
    if (!updatedWorker[1][0]) {
      throw new BadRequestException('Worker already activated!');
    };
    const response = {
      message: 'Worker succesfully activated!',
      worker: updatedWorker
    };

    return response;
  }

  async addRole(addRoleWorkerDto:AddRoleWorkerDto) {
    const worker = await this.workerRepo.findByPk(addRoleWorkerDto.workerId);
    const role = await this.roleService.getRoleByValue(addRoleWorkerDto.value);

    if (role && worker) {
      await worker.$add('roles', role.id);
      const updatedWorker = await this.workerRepo.findByPk(addRoleWorkerDto.workerId, {
        include: {all: true}
      });
      return updatedWorker;
    }
    throw new HttpException(
      'Worker or role not found!',
      HttpStatus.NOT_FOUND
    );
  }

  async removeRole(addRoleWorkerDto:AddRoleWorkerDto) {
    const worker = await this.workerRepo.findByPk(addRoleWorkerDto.workerId);
    const role = await this.roleService.getRoleByValue(addRoleWorkerDto.value);

    if (role && worker) {
      await worker.$remove('roles', role.id);
      const updatedWorker = await this.workerRepo.findByPk(addRoleWorkerDto.workerId, {
        include: {all: true}
      });
      return updatedWorker;
    }
    throw new HttpException(
      'Worker or role not found!',
      HttpStatus.NOT_FOUND
    );
  }
}