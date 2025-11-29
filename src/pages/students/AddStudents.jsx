import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { addStudent } from "../../redux/studentSlice";
import { fetchAllCampuses, selectAllCampuses } from "../../redux/campusSlice";
import {
  FormInput,
  FormSelect,
  FormImageInput,
  FormButton,
  FormContainer,
} from "../FormComponents";

const AddStudent = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campuses = useSelector(selectAllCampuses);

  const prefilledCampusId = searchParams.get("campusId");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: "",
    campusId: prefilledCampusId || "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCampuses());
  }, [dispatch]);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2)
          return "First name must be at least 2 characters";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.trim().length < 2)
          return "Last name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";
      case "imageUrl":
        if (value && !value.match(/^https?:\/\/.+/i)) {
          return "Please enter a valid URL";
        }
        return "";
      case "gpa":
        if (value === "") return "";
        const gpaNum = parseFloat(value);
        if (isNaN(gpaNum)) return "GPA must be a number";
        if (gpaNum < 0.0 || gpaNum > 4.0)
          return "GPA must be between 0.0 and 4.0";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "campusId") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      imageUrl: true,
      gpa: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const submitData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      imageUrl: formData.imageUrl.trim() || null,
      gpa: formData.gpa ? parseFloat(formData.gpa) : null,
      campusId: formData.campusId ? Number(formData.campusId) : null,
    };

    try {
      const result = await dispatch(addStudent(submitData)).unwrap();
      if (prefilledCampusId) {
        navigate(`/campus/${prefilledCampusId}`);
      } else {
        navigate(`/student/${result.id}`);
      }
    } catch (err) {
      alert(`Failed to create student: ${err}`);
      setIsSubmitting(false);
    }
  };

  const campusOptions = campuses.map((campus) => ({
    value: campus.id,
    label: campus.name,
  }));

  return (
    <FormContainer
      title="Add New Student"
      onBack={() =>
        navigate(
          prefilledCampusId ? `/campus/${prefilledCampusId}` : "/students"
        )
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="First Name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter first name"
          required
          error={errors.firstName}
          touched={touched.firstName}
        />

        <FormInput
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter last name"
          required
          error={errors.lastName}
          touched={touched.lastName}
        />

        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="student@example.edu"
          required
          error={errors.email}
          touched={touched.email}
        />

        <FormInput
          label="GPA (0.0 - 4.0)"
          id="gpa"
          name="gpa"
          type="number"
          value={formData.gpa}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="3.50"
          error={errors.gpa}
          touched={touched.gpa}
        />

        <FormSelect
          label="Campus (Optional)"
          id="campusId"
          name="campusId"
          value={formData.campusId}
          onChange={handleChange}
          options={campusOptions}
          placeholder="No campus selected"
        />

        <FormImageInput
          label="Image URL"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/photo.jpg"
          previewStyle="circular"
          error={errors.imageUrl}
          touched={touched.imageUrl}
        />

        <div className="flex gap-4 pt-4">
          <FormButton
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Creating..." : "Create Student"}
          </FormButton>
          <FormButton
            type="button"
            variant="secondary"
            onClick={() =>
              navigate(
                prefilledCampusId ? `/campus/${prefilledCampusId}` : "/students"
              )
            }
          >
            Cancel
          </FormButton>
        </div>
      </form>
    </FormContainer>
  );
};

export default AddStudent;
