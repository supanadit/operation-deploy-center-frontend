export interface DefaultResponseInterface<T> {
  data: T;
  success: boolean;
  message: string;
}

export class DefaultResponse<T> implements DefaultResponseInterface<T> {
  data: T;
  message: string;
  success: boolean;

  constructor(response: DefaultResponseInterface<T>) {
    this.data = response.data;
    this.message = response.message;
    this.success = response.success;
  }

  isSuccess() {
    return this.success;
  }
}
