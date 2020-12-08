import { IsNotEmpty } from 'class-validator';
export default class CreateGroupDto {
  @IsNotEmpty()
  public name: string | undefined;
  @IsNotEmpty()
  public code: string | undefined;
  public description: string | undefined;
}
