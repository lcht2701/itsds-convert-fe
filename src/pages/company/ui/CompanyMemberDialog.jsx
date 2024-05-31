import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "@/components/custom/ErrorMessage";
import CompanyMemberService from "@/servers/CompanyMemberService";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import CompanyAddressService from "@/servers/CompanyAddressService";
import useCompanyAddressList from "@/hooks/companyAddress/useCompanyAddressList";

export function CompanyMemberDialog({
  isOpen,
  onCancel,
  companyId,
  onReload,
  updateMemberId,
}) {
  const {} = useCompanyAddressList();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const schema = yup.object().shape({
    member_id: yup.string().required("Member is required"),
    company_address_id: yup.string().required("Address is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchData = async (id) => {
    setLoading(true);
    try {
      if (id !== null) {
        const response = await CompanyMemberService.getDetail(companyId, id);
        const result = response.result;
        setValue("member_id", result.member.id);
        setValue("company_address_id", result.companyAddress.id);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async (id) => {
    try {
      if (id !== null) {
        const response = await CompanyMemberService.getSelectList(id);
        const result = response.result;
        setMembers(result);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const fetchAddresses = async (id) => {
    try {
      if (id !== null) {
        const response = await CompanyAddressService.getPaginatedList(id);
        const result = response.result.data;
        setAddresses(result);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchMembers(companyId);
    fetchAddresses(companyId);
    fetchData(updateMemberId);
  }, [updateMemberId, companyId, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (updateMemberId) {
        await CompanyMemberService.update(companyId, updateMemberId, data);
      } else {
        await CompanyMemberService.add(companyId, data);
      }
      fetchMembers(companyId);
      fetchAddresses(companyId);
      onReload();
      onCancel();
    } catch (error) {
      console.error(`${updateMemberId ? "Update" : "Add"} failed:`, error);
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
              {updateMemberId ? "Update" : "Create"} Company Member
            </DialogTitle>
            <DialogDescription>
              {updateMemberId
                ? "Update the company's location information. Click save when you're done."
                : "Add information for the company's new location. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Spinner size="medium" />
          ) : (
            <div className="grid gap-4 py-4">
              {updateMemberId === null && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Controller
                    id="member_id"
                    name="member_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value?.toString()}
                      >
                        <Label
                          id="member_id"
                          htmlFor="member_id"
                          className="text-right"
                        >
                          Member
                        </Label>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a member" />
                        </SelectTrigger>
                        <SelectContent>
                          {members.map((member) => (
                            <SelectItem
                              key={member.id}
                              value={member.id.toString()}
                            >
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <ErrorMessage errors={errors} name="member_id" />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Controller
                  id="company_address_id"
                  name="company_address_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <Label
                        id="company_address_id"
                        htmlFor="company_address_id"
                        className="text-right"
                      >
                        Address
                      </Label>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a address" />
                      </SelectTrigger>
                      <SelectContent>
                        {addresses.map((address) => (
                          <SelectItem
                            key={address.id}
                            value={address.id.toString()}
                          >
                            {address.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage errors={errors} name="company_address_id" />
              </div>
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
