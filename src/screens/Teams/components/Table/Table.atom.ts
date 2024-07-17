import { atom } from "recoil";

import { Team } from "@screens/Teams/types";

export const teamsTableAtom = atom<Team[]>({
    key: 'teamsTableAtom',
    default: []
})