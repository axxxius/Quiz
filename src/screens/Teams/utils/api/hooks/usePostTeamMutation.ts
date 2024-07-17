import { TeamValue } from "@screens/Teams/types"
import { useMutation } from "@tanstack/react-query"

import { postTeam } from "../requests/teams/post"

export const usePostTeamMutation = () => {
    return useMutation({
        mutationKey: ['sendTeam'],
        mutationFn: (teamValue: TeamValue) => postTeam(teamValue)
    })
}