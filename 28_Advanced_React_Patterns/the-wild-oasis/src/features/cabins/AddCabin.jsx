
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import CabinTable from './CabinTable';

function AddCabin() {
  return (
    <div>
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

{/* we can have multiple modal windows open at the same time we track them by name i.e:-cabin-form, table */}
      {/* <Modal.Open opens='table'>
        <Button>View all cabins</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window> */}

    </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
//         Add new cabin
//       </Button>
//       {
//         isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//           </Modal>
//         )
//       }
//     </div>
//   );
// }

export default AddCabin;
