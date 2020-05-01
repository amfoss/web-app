export const clubAttendance = `
query{
  clubAttendance{
    dailyLog{
      avgDuration
      date
      membersPresent
      members{
        user{
          username
          firstName
          lastName
        }
        duration
        start
        end
      }
    }
  }
}`;

export const getApplicant = `
query getApplicant($hash: String!){
  getApplicant(hash: $hash){
    id
    name
    formData{
      key
      value
    }
  }
}
`;
