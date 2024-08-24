import React from 'react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  currentData: any;
  setCurrentData: (data: any) => void;
  handleSave: () => void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  currentData,
  setCurrentData,
  handleSave,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">
          {currentData?.id ? "Edit" : "Create"} Entry
        </h2>
        <div className="space-y-4">
          <input
            type="file"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
            onChange={(e) =>
              setCurrentData({
                ...currentData,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
          <input
            type="text"
            placeholder="Name"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={currentData.name}
            onChange={(e) =>
              setCurrentData({ ...currentData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Position"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={currentData.position}
            onChange={(e) =>
              setCurrentData({ ...currentData, position: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Office"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={currentData.office}
            onChange={(e) =>
              setCurrentData({ ...currentData, office: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={currentData.age}
            onChange={(e) =>
              setCurrentData({ ...currentData, age: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Start date"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={currentData.startDate}
            onChange={(e) =>
              setCurrentData({
                ...currentData,
                startDate: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Salary"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={currentData.salary}
            onChange={(e) =>
              setCurrentData({ ...currentData, salary: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
