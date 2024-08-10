import { UpdateCreditsInputDto } from './update-credits-input.dto';

export class UpdateUserInputDto {
  id: number;
  credits: UpdateCreditsInputDto;
}
