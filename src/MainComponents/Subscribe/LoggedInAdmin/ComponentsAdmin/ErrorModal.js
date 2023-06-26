import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchLoginForm } from "../../LogIn/reducerLoginForm";

export default function ErrorModal({handleLogout}) {

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(true);

    const handleCloseModal = () => {
      setModalIsOpen(false);
    //   handleLogout();
        dispatch(fetchLoginForm(null, null));
        localStorage.clear();
        navigate("/login");
    };
    return (
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h2>Please log in again</h2>
        <button onClick={handleCloseModal}>OK</button>
      </Modal>
    );
  }
  