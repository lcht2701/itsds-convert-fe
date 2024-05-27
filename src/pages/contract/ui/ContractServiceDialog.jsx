import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useContractServiceList from "@/hooks/contractService/useContractServiceList";
import useContractService from "@/hooks/contractService/useContractService";
import Select from "react-select";

export function ContractServiceDialog({
  isOpen,
  onCancel,
  contractId,
  onReload,
}) {
  const { contractServices, loading, fetchContractServicesSelectList } =
    useContractServiceList(contractId);
  const { addContract } = useContractService(contractId);
  const schema = yup.object().shape({
    serviceIds: yup
      .array()
      .min(1, "You must select at least one service")
      .required("Service selection is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchContractServicesSelectList();
  }, [contractId, fetchContractServicesSelectList]);

  const mappedServices = contractServices.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const onSubmit = async (data) => {
    addContract(data);
    onCancel();
    onReload();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => (isOpen ? null : onCancel())}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Services to Contract</DialogTitle>
            <DialogDescription>
              Add service that is registered so that user is able to add when
              request a ticket
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Spinner size="medium" />
          ) : (
            <div className="grid gap-4 py-4">
              <Controller
                control={control}
                name="serviceIds"
                render={({ field }) => (
                  <Select
                    isMulti
                    options={mappedServices}
                    onChange={(selectedOptions) =>
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      )
                    }
                    className="w-full"
                    classNamePrefix="select"
                  />
                )}
              />
              <ErrorMessage errors={errors} name="serviceIds" />
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
