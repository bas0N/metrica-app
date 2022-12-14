import { Recruitment } from "./recruitment";

export enum SurveyStatus {
  FILLED,
  PENDING,
  DRAFT,
}

export enum SurveyType {
  FRONTEND,
  BACKEND,
  UXUI,
  DEVOPS,
}
export type Survey = {
  _id: string;
  createdBy: string;
  recipientEmail: string;
  candidateFirstName: string;
  candidateLastName: string;
  surveyStatus: SurveyStatus;
  recruitment: Recruitment;
  terminationDate: Date;
  creationDate: Date;
  surveyData: {
    technologiesSurvey: Object;
    aboutYouSurvey: Object;
    personalLinksSurvey: Object;
  };
  __v: 0;
};

export type SurveyDataToRender = {
  id: string;
  name: string;
  position: string;
  team: string;
  status: string;
  age: string;
  deadline: Date;
  avatar: string;
  email: string;
};
export type GetNumberOfSurveyPages = {
  numOfSurveyPages: 3;
};
export type GetSurveysPaginated = {
  surveys: Survey[];
  pagesAvailable: number;
  totalItems: number;
};

export type TechnologiesSurveyType = {
  languages: string[];
  frontend: string[];
  backend: string[];
  devops: string[];
  databases: string[];
  uxui: string[];
};

export type AboutYouSurveyType = {
  position: string;
  yearsOfExperience: string;
  description: string;
};

export type PersonalLinksSurveyType = {
  githubUrl: string;
  linkedinUrl: string;
  repositoryUrl: string;
};
