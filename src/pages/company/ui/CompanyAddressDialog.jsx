import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/custom/ErrorMessage";
import CompanyAddressService from "@/servers/CompanyAddressService";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function CompanyAddressDialog({
  isOpen,
  onCancel,
  companyId,
  onReload,
  updateAddressId,
}) {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    address: yup
      .string()
      .required("Address is required")
      .max(1024, "Max 1024 characters"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async (id) => {
      setLoading(true);
      try {
        if (id !== null) {
          const response = await CompanyAddressService.getDetail(companyId, id);
          const result = response.result;
          setValue("address", result.address);
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(updateAddressId);
  }, [updateAddressId, companyId, setValue, reset]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (updateAddressId) {
        await CompanyAddressService.update(companyId, updateAddressId, data);
      } else {
        await CompanyAddressService.add(companyId, data);
      }
      onReload();
      onCancel();
    } catch (error) {
      console.error(`${updateAddressId ? "Update" : "Add"} failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => (isOpen ? null : onCancel())}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {updateAddressId ? "Update" : "Create"} Company Address
            </DialogTitle>
            <DialogDescription>
              {updateAddressId
                ? "Update the company's location information. Click save when you're done."
                : "Add information for the company's new location. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Spinner size="medium" />
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="Input Address"
                  className="col-span-3"
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <ErrorMessage errors={errors} name="address" />
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
