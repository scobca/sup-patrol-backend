export class GetUserOutputDto {
  constructor(
    public id: number | null = null,
    public name: string | null = null,
    public email: string | null = null,
    public phone: string | null = null,
    public tgID: number | null = null,
    public tokenType: number | null = null,
  ) {}
}
