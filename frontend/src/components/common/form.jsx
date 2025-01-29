import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export const CommonForm = ({
  formComponentDetails,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  errors,
}) => {
  const renderComponentType = (formComponentDetail) => {
    const value = formData[formComponentDetail.name] || "";

    switch (formComponentDetail.componentType) {
      case "input":
        return (
          <Input
            name={formComponentDetail.name}
            placeholder={formComponentDetail.placeholder}
            id={formComponentDetail.name}
            type={formComponentDetail.type}
            value={value}
            required={formComponentDetail.required}
            className="border-gray-300 w-full focus:ring-2 focus:ring-primary-500 text-white focus:border-primary-500 transition-all duration-300"
            onChange={(e) =>
              setFormData({
                ...formData,
                [formComponentDetail.name]: e.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [formComponentDetail.name]: value,
              })
            }
            value={formData[formComponentDetail.name]}
          >
            <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300">
              <SelectValue placeholder={formComponentDetail.label} />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg rounded-md">
              {formComponentDetail.options?.map((optionItem) => (
                <SelectItem
                  key={optionItem.id}
                  value={optionItem.id}
                  className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                >
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={formComponentDetail.name}
            placeholder={formComponentDetail.placeholder}
            value={value}
            className="border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 min-h-[100px]"
            onChange={(e) =>
              setFormData({
                ...formData,
                [formComponentDetail.name]: e.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            name={formComponentDetail.name}
            placeholder={formComponentDetail.placeholder}
            id={formComponentDetail.name}
            type={formComponentDetail.type}
            value={value}
            className="border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
            onChange={(e) =>
              setFormData({
                ...formData,
                [formComponentDetail.name]: e.target.value,
              })
            }
          />
        );
    }
  };
  console.log(onSubmit);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 w-[300px]">
          {formComponentDetails.map((formDetail) => {
            return (
              <>
                <div className="grid w-full gap-1.5" key={formDetail.name}>
                  <Label className="mb-1 text-l text-white my-1">
                    {formDetail.label}
                  </Label>

                  {renderComponentType(formDetail)}
                </div>
              </>
            );
          })}
          <Button
            type="submit"
            disabled={isBtnDisabled}
            className="w-full mt-4 bg-white transform hover:scale-105 active:scale-110 transition-transform"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};
