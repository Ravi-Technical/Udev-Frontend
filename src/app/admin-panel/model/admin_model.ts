export interface IAddCategoryModel {
    CategoryName: string;
}
export interface IGetAllCategories {
    id: string,
    categoryName: string,
    status: boolean,
    timeStamp: Date
}
export interface IAdminAddCourse {
      title: string,
      description: string,
      courseVideo: string,
      courseContent: string,
      thumbnailImage: string,
      categoryId:string,
      price: number,
      courseCode: string,
      language: string,
      level: string,
      enrollCount:number,
      isFeatured: Boolean,
      lastUpdate: Date,
      certificateAvailable:Boolean,
      ratings: number,
      timestamp: Date,
      totalHours: number,
      instructors: string,
      status: Boolean
}
export interface CoursePagedResult<T> {
     items:T[];
     totalCount:number;
     pageNumber:number;
     pageSize:number;
} 
export interface ISlider {
    imgUrl:string;
    Alt_Tag:string;
    Status:boolean;
}
export interface ICountry{
    id:string;
    name:string;
    countryCode:string;
    isActive:boolean;
    state: any[];
    timeStamp:string;
}
export interface IStates{
    id:string;
    stateName:string;
    stateCode:string;
    countryId:string;
    country:{};
    isActive:boolean;
    timeStamp:Date;
}
export interface IApiResponse<T>{
  success: Boolean,
  message?:string,
  data:T // Object , Array, string , numbers etc.
}
