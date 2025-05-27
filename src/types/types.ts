import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface CarDropDownProps {
  title?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export interface CarInputProps {
  type: string;
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AvailableSensorsCardPropsTypes {
  para?: string;
  unit?: string;
}

export interface BlueCardPropsTypes {
  title1?: string;
  amount1?: string;
  title2?: string;
  amount2?: string;
}

export interface NotiesCardPropsCard {
  title?: string;
  date?: string;
  para?: string;
  icon?: ReactNode;
  className?: string;
}

export interface PageChangeType {
  title: string;
  link?: string;
  signUp?: string;
  para?: string;
}

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  title?: string;
  placeholder?: string;
}

export interface BookingCardType {
  id: string;
  brand: string;
  carName: string;
  carImage: string;
  price: string;
  views: number;
  engine: string;
  onClick: () => void;
  bookings?: Array<{
    id: string;
    rentalDate: string; // ISO-8601 DateTime (e.g., "2025-05-27T00:00:00.000Z")
    days: number;
  }>;
}

export interface BookingDropDownType {
  className?: string;
  setSelectedCar?: (carName: string | null) => void;
  isOpen?: boolean;
  handleIsOpen?: () => void;
  selectedOption?: string;
  setSelectedOption?: (option: string) => void;
  setIsOpen?: (isOpen: boolean) => void;
  uniqueCars?: string[];
}

export interface AuthBtnProps {
  title: string;
  loading?: boolean;
  style?: string;
  onClick?: () => void;
}

export interface CarCrudBtnType {
  title?: string;
  style: string;
  onClick?: () => void;
}

export interface HomeButtonType {
  title?: string;
  style: string;
  carType?: string;
  onClick?: () => void;
  icon?: React.ReactElement;
  desc?: string;
}

export interface LoginWithSocialMediaProps {
  className?: string;
  title?: string;
  signIn?: () => void;
}

export interface FilterBtnPropsTypes {
  heading?: string;
}

export interface EventCardCalenderPropsTypes {
  className?: string;
  src?: string | StaticImageData;
}

export interface DashboardMilesChartPropsTypes {
  heading?: string;
  para?: string;
  className1?: string;
  className2?: string;
  className3?: string;
}

export interface PerformanceCardPropsTypes {
  className1?: string;
  heading?: string;
  src?: string | StaticImageData;
  chart?: React.ReactNode;
}

export interface PerformenceChartProps {
  title: string;
  progressColor?: string;
}

export interface RecommendCardPropsTypes {
  brand: string;
  className?: string;
  carName: string;
  image: string;
  price: string;
  views: number;
  onClick: () => void;
}

export interface ImageType {
  name: string;
  icon: string;
}

export interface CarRentalFormType {
  title: string;
  icon: React.ReactElement;
  type: "text" | "date";
  placeholder?: string;
}

export interface ServicesCardType {
  icon: React.ReactElement;
  title: string;
  desc: string;
}

export interface WorkCardType {
  heading: string;
  desc: string;
  icon: string;
}

export interface ImpressiveCollectionCardType {
  carId: string;
  imageUrl: string;
  carName: string;
  price: string;
  milage: string;
  enginType: string;
  transmissionType: string;
}

export interface LoaderType {
  style: string;
}

export interface LogoutModalProps {
  onClick?: () => void;
  title?: string;
  para?: string;
  className1?: string;
  className2?: string;
}

export interface UpdateModalType {
  car: Car;
  handleIsOpen: () => void;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface OffrersIconType {
  title: string;
  para: string;
  icon: React.ReactNode;
  style?: string;
  iconStyle?: string;
}

export interface ServicesSmallCardPropsTypes {
  className?: string;
  title?: string;
}

export interface ServiceScheduleCardPropsTypes {
  para?: string;
  date?: string;
  price?: string;
}

export interface ServicesCardPropsTypes {
  imgSrc?: string | StaticImageData;
  title?: string;
  parts?: string;
  condition?: string;
  className?: string;
}

export interface YourOrderCardPropsTypes {
  circleDesign?: string;
  heading?: string;
  amount?: string;
}

export interface UserInputProps {
  icon?: React.ReactNode;
  title?: string;
  placeholder?: React.ReactNode;
  type?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export interface ToastProviderType {
  children: ReactNode;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
  dateOfBirth: Date;
  gender: string;
  profilePhoto: string;
  role: string;
}

export interface AuthStateProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  allUsers: User[];
}

export interface ChangePassword {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Car {
  id: string;
  userID: string;
  brand: string;
  carName: string;
  model: string;
  mileage: string;
  engine: string;
  transmission: string;
  price: string;
  carType: string;
  description: string;
  image: string;
  imageUrl: string;
  views: number;
}

export interface AddCarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
  updateCarData: Car | null;
}

export interface carStateTypes {
  brand: string;
  carName: string;
  model: string;
  mileage: string;
  engineType: string;
  transmissionType: string;
  price: string;
  carType: string;
  description: string;
  image: string;
}

export interface updateCarDataType {
  id: string;
  brand: string;
  carName: string;
  model: string;
  mileage: string;
  engineType: string;
  transmissionType: string;
  price: string;
  carType: string;
  description: string;
  image: string;
}

export interface userDetailsProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  street: string;
  dateOfBirth: Date;
  gender: string;
  profilePhoto: string;
}

export interface UserState {
  userDetails: userDetailsProps | null;
  loading: boolean;
  error: string | null;
}

export interface EventsState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  color?: string;
}

// CMS
export interface CMSType {
  fields?: {
    image?: {
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
    icon?: {
      fields?: {
        file?: {
          url?: string;
        };
      };
    };
    name?: string;
    title?: string;
    description?: string;
    heading?: string;
    userName?: string;
    area?: string;
  };
}
