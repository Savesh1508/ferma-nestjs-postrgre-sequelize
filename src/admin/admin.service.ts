import { HttpException, HttpStatus, BadRequestException, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { RoleService } from "src/roles/roles.service";
import { AddRoleAdminDto } from "./dto/add-role.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./model/admin.model";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "src/mail/mail.service";
import { LoginAdminDto } from "./dto/login-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
  ){}

  async createAdmin(createAdminDto:CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException("Email already exists");
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('MARKET');
    // const role = await this.roleService.getRoleByValue('ADMIN');
    // const role = await this.roleService.getRoleByValue('SUPERADMIN');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await admin.$set('roles', [role.id]);
    await admin.save();
    admin.roles = [role];

    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newAdmin.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendAdminConfirmation(updateAdmin[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    return newAdmin;
  }

  async getAllAdmins():Promise<Admin[]> {
    const admins = await this.adminRepo.findAll({include: {all: true}});
    return admins;
  }

  async getAdminById(id:number) {
    const admin = await this.adminRepo.findOne({where: {id}, include: {all: true}});
    return admin;
  }

  async getAdminByEmail(email:string) {
    const admin = await this.adminRepo.findOne({where: {email}, include: {all: true}});
    return admin;
  }

  async updateAdminById(id:number, updateAdminDto:UpdateAdminDto):Promise<Admin> {
    const admin = await this.adminRepo.update(updateAdminDto, {where: {id}, returning: true});
    return admin[1][0].dataValues;
  }

  async deleteAdminById(id:number) {
    const admin = await this.adminRepo.destroy({where: {id}})
    if (!admin) {
      throw new HttpException('Admin not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Admin has deleted!"};
  }

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException("Email already exists");
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('USER');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await newAdmin.$set('roles', [role.id]);
    await newAdmin.save();
    newAdmin.roles = [role];

    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newAdmin.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendAdminConfirmation(updateAdmin[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: "Admin registred",
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto
    const admin = await this.adminRepo.findOne({
      where: { email },
      include: ['roles'],
    });

    if (!admin) {
      throw new UnauthorizedException("Admin is not registered");
    }
    if (!admin.is_active) {
      throw new UnauthorizedException("Admin is not active");
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin is not registered(pss)')
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Admin logged in",
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }


  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not found');
    }
    const updatedAdmin = await this.adminRepo.update(
      {hashed_refresh_token: null},
      {where: {id: adminData.id}, returning: true}
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out succesfully',
      admin: updatedAdmin[1][0]
    };

    return response
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('admin not found');
    }
    const admin = await this.adminRepo.findOne({where: {id: admin_id}});
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Admin logged in",
      admin: updateAdmin[1][0],
      tokens,
    };

    return response;
  }

  async getTokens(admin: Admin) {
    if (!admin || !admin.roles || !Array.isArray(admin.roles)) {
      throw new BadRequestException('Invalid admin data');
    }

    const jwtpayload = {
      id: admin.id,
      is_active: admin.is_active,
      roles: admin.roles.map(role => role.value)
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

    const updatedAdmin = await this.adminRepo.update(
      { is_active: true },
      { where: {activation_link: link, is_active: false}, returning: true }
    );
    if (!updatedAdmin[1][0]) {
      throw new BadRequestException('Admin already activated!');
    };
    const response = {
      message: 'Admin succesfully activated!',
      admin: updatedAdmin
    };

    return response;
  }

  async addRole(addRoleAdminDto:AddRoleAdminDto) {
    const admin = await this.adminRepo.findByPk(addRoleAdminDto.adminId);
    const role = await this.roleService.getRoleByValue(addRoleAdminDto.value);

    if (role && admin) {
      await admin.$add('roles', role.id);
      const updatedAdmin = await this.adminRepo.findByPk(addRoleAdminDto.adminId, {
        include: {all: true}
      });
      return updatedAdmin;
    }
    throw new HttpException(
      'Admin or role not found!',
      HttpStatus.NOT_FOUND
    );
  }

  async removeRole(addRoleAdminDto:AddRoleAdminDto) {
    const admin = await this.adminRepo.findByPk(addRoleAdminDto.adminId);
    const role = await this.roleService.getRoleByValue(addRoleAdminDto.value);

    if (role && admin) {
      await admin.$remove('roles', role.id);
      const updatedAdmin = await this.adminRepo.findByPk(addRoleAdminDto.adminId, {
        include: {all: true}
      });
      return updatedAdmin;
    }
    throw new HttpException(
      'Admin or role not found!',
      HttpStatus.NOT_FOUND
    );
  }
}