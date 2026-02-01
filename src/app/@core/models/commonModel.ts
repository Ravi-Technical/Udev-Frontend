export interface IURegisterModel {
      fullName: string,
      email: string
}
export interface IUserOtpSend {
      email: string;
}
export interface IULogin {
      role: string;
      email: string;
      otp: number;
}

export interface ICourseModel {
      title: string,
      description: string,
      courseVideo: string,
      courseContent: string,
      thumbnailImage: string,
      categoryId: string,
      price: number,
      courseCode: string,
      language: string,
      enrollCount: number,
      isFeatured: Boolean,
      lastUpdate: Date,
      certificateAvailable: Boolean,
      ratings: number,
      timestamp: Date,
      totalHours: number,
      instructors: string,
      status: Boolean
}

// ************************************* Filter Model ************************************** //
export interface IFilterModel {
      Language?: string[],
      Level?: string[],
      Rating?: number[],
      Hours?: string[],
      VideoLength?: string[],
      ClearFilter?: string[],
}
export interface CourseSearchRequest {
      Keyword: string;
      Page: number;
      PageSize: number;
      Filters?: IFilterModel;
}

export interface LevelFilter {
      key: string;
      name: string;
      count?: number;
}

//*********************************** End Filter Model ************************************** //
export interface IApiResponse<T> {
      success: Boolean,
      message?: string,
      data: T // Object , Array, string , numbers etc.
}

//*********************************** Payment Model ************************************** //
export interface CourseOrderResponse {
      orderId: string,
      razorpayOrderId: string
      totalAmount: number,
      razorpayKey: string
}
export interface VerifyOrderPaymentModel {
      OrderId: string,
      RazorpayOrderId: string
      RazorpayPaymentId: string,
      RazorpaySignature: string
}
export interface IApiResponse<T> {
      success: Boolean,
      message?: string,
      data: T // Object , Array, string , numbers etc.
}
export interface ICountry {
      id: string;
      name: string;
      countryCode: string;
      isActive: boolean;
      state: any[];
      timeStamp: string;
}
export interface IStates {
      id: string;
      stateName: string;
      stateCode: string;
      countryId: string;
      country: {};
      isActive: boolean;
      timeStamp: Date;
}

