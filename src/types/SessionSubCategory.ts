import {
  Comments,
  EmissionFactors,
  SessionEmissionCategories,
  SessionEmissions,
  SessionEmissionSubCategories,
} from '@prisma/client'
import { DataToFill } from './DataToFill';

export interface SessionCategory extends SessionEmissionCategories {
  sessionEmissionSubCategories: SessionSubCategory[]
}

export interface SessionSubCategory extends SessionEmissionSubCategories {
  sessionEmissions: SessionEmissions[];
  comments: Comments[];
  dataToFill?: DataToFill;
  locked?: boolean;
  emissionSubCategory?: {
    emissionFactors?: EmissionFactors[];
  };
}
