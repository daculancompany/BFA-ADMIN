import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(openModal({ title: "Add New Personnel", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }));
  };

  return (
    <div className="inline-block float-right">
      <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: { message: `Are you sure you want to delete this Personnel?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index },
      })
    );
  };

  return (
    <>
      <TitleCard title="Personnel" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Info</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index}>
                  <td>{`${lead.first_name} ${lead.last_name ? lead.last_name : ""}`}</td>
                  <td>{lead.email}</td>
                  <td>{lead.contactInfo}</td>
                  <td>{lead.address}</td>
                  <td>
                    <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => deleteCurrentLead(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
