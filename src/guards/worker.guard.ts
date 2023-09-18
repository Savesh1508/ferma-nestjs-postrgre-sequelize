import { BadGatewayException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Worker } from "src/worker/model/worker.model";

@Injectable()
export class WorkerGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Worker unauthorized!');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Worker unauthorized!');
    }

    async function verify(token:string, jwtService:JwtService) {
      const worker: Partial<Worker> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY
      })
      if (!worker) {
        throw new UnauthorizedException('Invalid token provided!');
      }

      req.user = worker
      return true;
    }

    return verify(token, this.jwtService);
  }
}