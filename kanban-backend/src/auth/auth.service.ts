// src/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs'; // Importe bcryptjs
import { JwtService } from '@nestjs/jwt'; // Importe JwtService
import { AuthCredentialsDto } from './dto/auth-credentials.dto'; // Vamos criar este DTO

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Injeta o serviço JWT
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    // Hash da senha
    const salt = await bcrypt.genSalt(); // Gera um salt aleatório
    const hashedPassword = await bcrypt.hash(password, salt); // Hashea a senha com o salt

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      // Código de erro para e-mail duplicado no SQLite é 19
      if (error.code === 'SQLITE_CONSTRAINT' || error.errno === 19) {
        throw new ConflictException('Email já cadastrado.');
      } else {
        throw new BadRequestException('Erro ao cadastrar usuário.');
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Se o usuário existir e a senha estiver correta, gera o token JWT
      const payload = { email: user.email, sub: user.id };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
  }
}
