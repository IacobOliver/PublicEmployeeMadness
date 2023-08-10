import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm";
import Loading from "../Components/Loading";
 const updateEquipment = (equipment) => {
  return fetch(`/api/equipment/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipment/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [EquipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((equipment) => {
        setEquipment(equipment);
        setEquipmentLoading(false);
      });
  }, [id]);

  const handleUpdateEquipment = (equipment) => {
    setUpdateLoading(true);
    updateEquipment(equipment)
      .then(() => {
        setUpdateLoading(false);
        navigate("/equipment");
      });
  };

  if (EquipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/equipment")}
    />
  );
};

export default EquipmentUpdater;
