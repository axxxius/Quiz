import { useQuery } from "@tanstack/react-query"

import { getTeams } from "../requests/teams/get"

export const useGetTeamsQuery = () => {
    return useQuery({
        queryKey: ['getTeams'],
        queryFn: () => getTeams()
    })
}