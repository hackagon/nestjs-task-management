import { IsString, MinLength, MaxLength } from 'class-validator';

export class CredentialsDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}