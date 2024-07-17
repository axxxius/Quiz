import { Team } from "@screens/Teams/types"

import { api } from "./../../../../../../../utils/api/instance"

export const getTeams = async () => {
    return await api.get<Team[]>('/teams/');
}