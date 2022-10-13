import { Programs, ReservationResponse, Reservations } from '@/interfaces/users.interface';
import { logger } from '@/utils/logger';
import normalizeSelfList from '@/utils/normalize-self-list';
import userModel from '@models/users.model';
import fetch from 'node-fetch';
import AuthService from './auth.service';

class UserService {
  public users = userModel;

  private authService = new AuthService();

  public getSelfs = async (id: number) => {
    const accessToken = await this.authService.getAccessToken(id);

    const data = await fetch('https://refahi.kntu.ac.ir/rest/selfs', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });
    return normalizeSelfList(await data.json());
  };

  public getReserves = async (id: number): Promise<Reservations> => {
    const accessToken = await this.authService.getAccessToken(id);

    const data = await fetch('https://refahi.kntu.ac.ir/rest/reserves?weekStartDate=', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });
    return data.json();
  };

  public getDailySellPrograms = async (id: number) => {
    const accessToken = await this.authService.getAccessToken(id);

    const data = await fetch('https://refahi.kntu.ac.ir/rest/daily-sell-programs', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });
    return data.json();
  };

  public getPrograms = async (selectedSelfId: number, id: number, startDate = ''): Promise<Programs> => {
    const accessToken = await this.authService.getAccessToken(id);

    const data = await fetch(`https://refahi.kntu.ac.ir/rest/programs?selectedSelfId=${selectedSelfId}&weekStartDate=${startDate}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    });
    return data.json();
  };

  public reserveFood = async ({ programId, foodTypeId }: { programId: string; foodTypeId: string }, id: number): Promise<ReservationResponse> => {
    const accessToken = await this.authService.getAccessToken(id);

    const response = await fetch(`https://refahi.kntu.ac.ir/rest/reserves/${programId}/reserve`, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: `{"foodTypeId":${Number(foodTypeId)},"freeFoodSelected":false,"mealTypeId":2,"selected":true,"selectedCount":1}`,
      method: 'PUT',
    });

    return response.json();
  };

  public getUserById = (telegramId: number) => {
    return this.users.findOne({ telegramId });
  };
}

export default UserService;
