type DummyUserType = {
  name: string,
  surname: string,
  email: string,
  gender: string,
  birthdate: string,
  tag: string,
  profileDetails: string | null,
  profilePicture?: string | null,
}

export const DummyUser: DummyUserType = {
  name: 'John',
  surname: 'Doe',
  email: 'test@test.pl',
  gender: 'Male',
  birthdate: '01.01.2000',
  tag: '@johndoe',
  profileDetails: "https://static-cdn.jtvnw.net/jtv_user_pictures/a7423251-6e4f-42f2-a33f-ca083eafae69-profile_image-300x300.png",
}