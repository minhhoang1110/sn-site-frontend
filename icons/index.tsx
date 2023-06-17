import React from "react";
import ChevronDown from "./ChevronDown";
import Search from "./Search";
import Mail from "./Mail";
import Phone from "./Phone";
import Cake from "./Cake";
import InformationCircle from "./InformationCircle";
import MapPin from "./MapPin";
import Globe from "./Globe";
import User from "./User";
import LockClosed from "./LockClosed";
import Like from "./Like";
import CommentIcon from "./CommentIcon";
import PencilSpuare from "./PencilSquare";
import ChatBubble from "./ChatBubble";
import ArrowLeft from "./ArrowLeft";
import Photo from "./Photo";
import PaperAirPlane from "./PaperAirPlane";
interface Props {
  icon: string;
}
const Icon: React.FC<Props> = ({ icon }) => {
  switch (icon) {
    case "chevron-down":
      return <ChevronDown />;
    case "search":
      return <Search />;
    case "mail":
      return <Mail />;
    case "phone":
      return <Phone />;
    case "cake":
      return <Cake />;
    case "infor-circle":
      return <InformationCircle />;
    case "map-pin":
      return <MapPin />;
    case "globe":
      return <Globe />;
    case "user":
      return <User />;
    case "lock-closed":
      return <LockClosed />;
    case "like":
      return <Like />;
    case "comment":
      return <CommentIcon />;
    case "pencil-square":
      return <PencilSpuare />;
    case "chat":
      return <ChatBubble />;
    case "arrow-left":
      return <ArrowLeft />;
    case "photo":
      return <Photo />;
    case "paper-airplane":
      return <PaperAirPlane />;
    default:
      return <></>;
  }
};
export default Icon;
