export class MatchingValuesUserOutputDto {
  constructor(
    public email: string | null = null,
    public phone: string | null = null,
    public tgID: number | null = null,
  ) {}
}
