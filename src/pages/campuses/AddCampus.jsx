import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addCampus } from "../../redux/campusSlice";
import {
  FormInput,
  FormTextarea,
  FormImageInput,
  FormButton,
  FormContainer,
} from "../FormComponents";

const AddCampus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Campus name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";
      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 5)
          return "Address must be at least 5 characters";
        return "";
      case "imageUrl":
        if (value && !value.match(/^https?:\/\/.+/i)) {
          return "Please enter a valid URL";
        }
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
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({
      name: true,
      address: true,
      description: true,
      imageUrl: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(addCampus(formData)).unwrap();
      navigate(`/campus/${result.id}`);
    } catch (err) {
      alert(`Failed to create campus: ${err}`);
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer title="Add New Campus" onBack={() => navigate("/campuses")}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Campus Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter campus name"
          required
          error={errors.name}
          touched={touched.name}
        />

        <FormInput
          label="Address"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter campus address"
          required
          error={errors.address}
          touched={touched.address}
        />

        <FormTextarea
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter campus description (optional)"
          error={errors.description}
          touched={touched.description}
        />

        <FormImageInput
          label="Image URL"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/image.jpg"
          previewStyle="rectangular"
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
            {isSubmitting ? "Creating..." : "Create Campus"}
          </FormButton>
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => navigate("/campuses")}
          >
            Cancel
          </FormButton>
        </div>
      </form>
    </FormContainer>
  );
};

export default AddCampus;
