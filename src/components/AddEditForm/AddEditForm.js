import React, { useCallback, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SERVER_IMAGE_PATH } from "../../utils/Constants";
import Stack from "@mui/material/Stack";
import { InputField } from "../Controls/InputField/InputField";
import { CommonText, CafeText, EmployeeText } from "../../utils/Texts";
import { Btn } from "../Controls/Button/Button";
import { dispatchSnackbarError } from "../../utils/Shared";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
// Initial state object for cafe form
const initialCafeObj = {
  id: "",
  name: "",
  description: "",
  location: "",
  logo: null,
};
// Initial state object for employee form
const initialEmpObj = {
  id: "",
  name: "",
  email_address: "",
  phone_number: "",
  gender: "",
  cafe_id: "",
  joining_date: dayjs(Date.now()),
};
//Regex for email verification
const emailRegex = new RegExp(
  "^[a-z0-9][a-z0-9-_\\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\\.[a-z0-9]{2,10}(?:\\.[a-z]{2,10})?$"
);
//Regex for phone number verification
const phoneRegex = new RegExp("^(8|9)\\d{7}$");

// Cafe form component
const CafeForm = ({ activeVal, isEdit, cafeObj, setCafeObj }) => {
  //Store file error
  const [fileErr, setFileErr] = useState("");
  //Store name field value
  const [name, setName] = useState(isEdit ? activeVal.name : "");
  //Store description field value
  const [description, setDescription] = useState(
    isEdit ? activeVal.description : ""
  );
  //Store location field value
  const [location, setLocation] = useState(isEdit ? activeVal.location : "");
  //Store logo field value
  const [logo, setLogo] = useState(
    isEdit && activeVal?.logo ? `${SERVER_IMAGE_PATH}/${activeVal.logo}` : null
  );
  //Store base64 of logo when selected for display purpose
  const [logoDisplay, setLogoDisplay] = useState(null);

  //Handle name input field
  const handleNameChange = (event) => {
    setName(event.target.value);
    setCafeObj({ ...cafeObj, name: event.target.value });
  };
  //Handle description input field
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setCafeObj({ ...cafeObj, description: event.target.value });
  };
  //Handle location input field
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setCafeObj({ ...cafeObj, location: event.target.value });
  };
  //Handle logo input field
  const handleFileUpload = (event) => {
    const FILE_SIZE = 1024 * 2; // 2MB
    const file =
      event?.target?.files?.length > 0 ? event?.target?.files[0] : undefined;
    //If file is selected then check for it's size and type
    if (file) {
      const fileSizeKiloBytes = file?.size / 1024;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file?.type)) {
        setFileErr("Only JPEG, PNG, and JPG images are allowed.");
        return;
      }
      if (fileSizeKiloBytes > FILE_SIZE) {
        setFileErr("File size is greater than 2mb");
        return;
      }
      setFileErr("");
      //If file size and type are valid then update the state variables
      const reader = new FileReader();
      setLogo(file);
      setCafeObj({ ...cafeObj, logo: file });
      reader.onloadend = () => {
        setLogoDisplay(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <InputField
        name={"name"}
        label={"Name"}
        isRequired
        value={name}
        fullWidth
        margin="dense"
        variant="standard"
        handleChange={handleNameChange}
      />
      <InputField
        name={"description"}
        label={"Description"}
        isRequired
        value={description}
        fullWidth
        isMultiline
        margin="dense"
        variant="standard"
        handleChange={handleDescriptionChange}
      />
      <InputField
        name={"location"}
        label={"Location"}
        isRequired
        value={location}
        fullWidth
        margin="dense"
        variant="standard"
        handleChange={handleLocationChange}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="logo">
          <Btn
            text="Upload Logo"
            variant="contained"
            component="span"
            onClick={handleFileUpload}
          />
          <InputField
            id="logo"
            name="logo"
            hidden
            accept="image/*"
            type="file"
            aria-describedby="my-file-error"
            onChange={handleFileUpload}
          />
          <FormHelperText id="my-file-error" className="Mui-error ml-2">
            {fileErr}
          </FormHelperText>
        </label>
        {(logo || logoDisplay) && (
          <img src={logoDisplay ?? logo} alt="Selected" height="100px" />
        )}
      </Stack>
    </div>
  );
};

// Employee form component
const EmployeeForm = ({
  activeVal,
  isEdit,
  employeeObj,
  setEmployeeObj,
  cafes,
}) => {
  //Store name field value
  const [name, setName] = useState(isEdit ? activeVal.name : "");
  //Store email address field value
  const [email, setEmail] = useState(isEdit ? activeVal.email_address : "");
  //Store phone number field value
  const [phone, setPhone] = useState(isEdit ? activeVal.phone_number : "");
  //Store gender field value
  const [gender, setGender] = useState(isEdit ? activeVal.gender ?? "" : "");
  //Store cafe id field value
  const [cafe, setCafe] = useState(isEdit ? activeVal.cafe_id ?? "" : "");
  //Store joining date field value
  const [joining, setJoining] = useState(
    isEdit
      ? dayjs(
          activeVal.joining_date ? new Date(activeVal.joining_date) : Date.now()
        )
      : dayjs(Date.now())
  );
  //Store email error
  const [emailErr, setEmailErr] = useState("");
  //Store phone error
  const [phoneErr, setPhoneErr] = useState("");
  //Handle name input field
  const handleNameChange = (event) => {
    setName(event.target.value);
    setEmployeeObj({ ...employeeObj, name: event.target.value });
  };
  //Handle email address input field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmployeeObj({ ...employeeObj, email_address: event.target.value });
  };
  //Handle phone number input field
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setEmployeeObj({ ...employeeObj, phone_number: event.target.value });
  };
  //Handle gender select field
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setEmployeeObj({ ...employeeObj, gender: event.target.value });
  };
  //Handle cafe id select field
  const handleCafeChange = (event) => {
    setCafe(event.target.value);
    setEmployeeObj({ ...employeeObj, cafe_id: event.target.value });
  };
  //Handle date field
  const handleDateChange = (newValue) => {
    setJoining(newValue);
    setEmployeeObj({ ...employeeObj, joining_date: newValue });
  };
  //Handle email validation
  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailErr("Email is invalid");
    } else {
      setEmailErr("");
    }
  };
  //Handle phone validation
  const validatePhone = () => {
    if (!phoneRegex.test(phone)) {
      setPhoneErr("Phone number is invalid");
    } else {
      setPhoneErr("");
    }
  };

  return (
    <div>
      <InputField
        name={"name"}
        label={"Name"}
        isRequired
        value={name}
        fullWidth
        margin="dense"
        variant="standard"
        handleChange={handleNameChange}
      />
      <InputField
        name={"email_address"}
        label={"Email Address"}
        isRequired
        value={email}
        fullWidth
        type="email"
        disabled={isEdit}
        error={emailErr !== ""}
        helperText={emailErr}
        margin="dense"
        variant="standard"
        handleChange={handleEmailChange}
        onBlur={validateEmail}
      />
      <InputField
        name={"phone_number"}
        label={"Phone Number"}
        isRequired
        value={phone}
        fullWidth
        type="tel"
        error={phoneErr !== ""}
        helperText={phoneErr}
        margin="dense"
        variant="standard"
        handleChange={handlePhoneChange}
        onBlur={validatePhone}
      />
      <FormControl variant="standard" margin="dense" fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="gender"
          id="gender"
          value={gender}
          label="Gender"
          onChange={handleGenderChange}
        >
          <MenuItem key="male" value={"male"}>
            Male
          </MenuItem>
          <MenuItem key="female" value={"female"}>
            Female
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" fullWidth margin="dense">
        <InputLabel id="cafe">Cafe</InputLabel>
        <Select
          labelId="cafe"
          id="cafe"
          value={cafe}
          label="Cafe"
          onChange={handleCafeChange}
        >
          {cafes?.map((v) => (
            <MenuItem key={`item-${v.id}`} value={v.id}>
              {v.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DatePicker
        className="mt-4"
        label="Joining Date"
        value={joining}
        onChange={handleDateChange}
      />
    </div>
  );
};
// Component to show dialog for form
const AddEditForm = ({
  open,
  handleClose,
  formType,
  activeVal,
  isEdit = false,
  cafes,
}) => {
  //Store cafe object for sending to the api or from the api in case of edit
  const [cafeObj, setCafeObj] = useState(initialCafeObj);
  //Store employee object for sending to the api or from the api in case of edit
  const [employeeObj, setEmployeeObj] = useState(initialEmpObj);

  //If edit is enabled then set props value to the local state variables
  useEffect(() => {
    if (isEdit) {
      if (formType === "cafe") {
        setCafeObj(Object.assign({}, activeVal));
      } else {
        setEmployeeObj(Object.assign({}, activeVal));
      }
    }
  }, [isEdit, formType, activeVal]);

  //Validate for any required fields before form submition
  const validate = useCallback(() => {
    let valid = true;
    if (formType === "cafe") {
      if (!cafeObj?.name || !cafeObj?.description || !cafeObj?.location) {
        valid = false;
      }
    } else {
      if (
        !employeeObj?.name ||
        !employeeObj?.email_address ||
        !employeeObj?.phone_number ||
        !employeeObj?.gender ||
        !emailRegex.test(employeeObj?.email_address) ||
        !phoneRegex.test(employeeObj?.phone_number)
      ) {
        valid = false;
      }
    }
    return valid;
  }, [formType, cafeObj, employeeObj]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setCafeObj(initialCafeObj);
        setEmployeeObj(initialEmpObj);
      }}
    >
      <DialogTitle>{`${
        isEdit
          ? CommonText.editModalTitlePrefix
          : CommonText.addModalTitlePrefix
      } ${formType}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {formType === "cafe"
            ? isEdit
              ? `${CafeText.addNewModalEditBody} ${activeVal?.name} ${CafeText.addNewModalEditBody2}`
              : CafeText.addNewModalBody
            : isEdit
            ? `${EmployeeText.addNewModalEditBody} ${activeVal?.name} ${EmployeeText.addNewModalEditBody2}`
            : EmployeeText.addNewModalBody}
        </DialogContentText>
        <form>
          {formType === "cafe" ? (
            <CafeForm {...{ activeVal, isEdit, cafeObj, setCafeObj }} />
          ) : (
            <EmployeeForm
              {...{ activeVal, isEdit, employeeObj, setEmployeeObj, cafes }}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Btn
          text={isEdit ? CommonText.editBtn : CommonText.addBtn}
          variant="text"
          handleClick={() => {
            if (validate()) {
              if (formType === "cafe") {
                //Convert obj to form data for allowing image upload
                const formData = new FormData();
                formData.append("logo", cafeObj.logo);
                formData.append("description", cafeObj.description);
                if (isEdit) {
                  formData.append("id", cafeObj.id);
                }
                formData.append("name", cafeObj.name);
                formData.append("location", cafeObj.location);
                handleClose(cafeObj.id, formData);
              } else {
                handleClose(employeeObj);
              }
            } else {
              dispatchSnackbarError(
                "Please fill all the required fields correctly."
              );
            }
          }}
        />
        <Btn
          text={CommonText.cancelBtn}
          variant="text"
          handleClick={() => {
            handleClose();
            setCafeObj(initialCafeObj);
            setEmployeeObj(initialEmpObj);
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddEditForm;
