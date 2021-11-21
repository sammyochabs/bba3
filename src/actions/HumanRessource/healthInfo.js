import apiClient from 'src/services/api'

export const getHealthInfoList = (onHealthInfoListResult) => {
  apiClient
    .get('/healthInfo/list', {
      params: { userID: localStorage.getItem('userID') },
    })
    .then((res) => {
      const healthInfoList = res.data.HealthInfoList
      onHealthInfoListResult(healthInfoList)
    })
    .catch((err) => {
      console.error(err)
    })
}

export const getHealthInfoListUser = (userID) => {
  return apiClient
    .get('/healthInfo/list', {
      params: { userID: userID, profile: 1 },
    })
    .then((res) => {
      return res.data.HealthInfoList
    })
    .catch((err) => {
      console.error(err)
    })
}
