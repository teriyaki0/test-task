import { FC } from "react";
import { RowType } from "../../types/RowType";
interface AdditionalInfoProps {
    selectedRow: RowType;
}
const AdditionalInfo: FC<AdditionalInfoProps> = ({selectedRow}) => {
  return (<div>
        <p>ID: {selectedRow._id}</p>
        <p>First Name: {selectedRow.firstName}</p>
        <p>Last Name: {selectedRow.lastName}</p>
        <p>Email: {selectedRow.email}</p>
        <p>Phone: {selectedRow.phone}</p>
    </div>)
};

export default AdditionalInfo;
