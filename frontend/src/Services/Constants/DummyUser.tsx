export type DummyUserType = {
  name: string,
  surname: string,
  email: string,
  gender: string,
  birthdate: string,
  joiningDate: string,
  tag: string,
  pronouns?: string | null
  profileDetails: string | null,
  profilePicture?: string | null,
  friends: DummyFriendsType | null
}

type DummySimpleUserType = {
  profilePicture?: string | null
}

type DummyFriendsType = {
  totalFriends: number,
  friendsDetails: DummySimpleUserType[] | null
}

const DummyUserFriends: DummyFriendsType = {
  totalFriends: 2,
  friendsDetails: [
    {
      profilePicture: ""
    },
    {
      profilePicture: ""
    }
  ]
}

export const DummyUser: DummyUserType = {
  name: 'John',
  surname: 'Doe',
  email: 'test@test.pl',
  gender: 'Male',
  birthdate: '01.01.2000',
  joiningDate: '05.08.2024',
  tag: '@johndoe',
  pronouns: "he/him",
  profilePicture: "https://static-cdn.jtvnw.net/jtv_user_pictures/a7423251-6e4f-42f2-a33f-ca083eafae69-profile_image-300x300.png",
  profileDetails: "<h1>Test details</h1>",
  friends: DummyUserFriends
}