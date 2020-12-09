export default class AddExperienceDto {
  public title: string | undefined;
  public company: string | undefined;
  public location: string | undefined;
  public from: Date | undefined;
  public to: Date | undefined;
  public current: boolean | undefined;
  public description: string | undefined;
}
