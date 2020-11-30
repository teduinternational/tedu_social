export default class CreateProfileDto {
  constructor(
    company: string,
    location: string,
    website: string,
    bio: string,
    skills: string,
    status: string,
    youtube: string,
    twitter: string,
    instagram: string,
    linkedin: string,
    facebook: string
  ) {
    this.company = company;
    this.location = location;
    this.website = website;
    this.bio = bio;
    this.skills = skills;
    this.status = status;
    this.youtube = youtube;
    this.twitter = twitter;
    this.instagram = instagram;
    this.linkedin = linkedin;
    this.facebook = facebook;
  }

  public company: string;
  public location: string;
  public website: string;
  public bio: string;
  public skills: string;
  public status: string;
  public youtube: string;
  public twitter: string;
  public instagram: string;
  public linkedin: string;
  public facebook: string;
}
