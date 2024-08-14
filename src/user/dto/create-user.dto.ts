// import { z } from 'zod';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be greater than or equal to 18' })
  @Max(65, { message: 'Age must be less than or equal to 65' })
  age: number;

  @IsString()
  gender: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}

// export const createUserSchema = z
//   .object({
//     name: z.string(),
//     age: z.number(),
//     gender: z.string(),
//     isAdmin: z.boolean().optional(),
//   })
//   .required();

// export type CreateUserDto = z.infer<typeof createUserSchema>;
