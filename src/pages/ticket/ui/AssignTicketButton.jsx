import { Button } from "@/components/ui/button";
import useAssignment from "@/hooks/assignment/useAssignment";
import useDialog from "@/hooks/useDialog";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AssignTicketButton = ({ ticketId, onReload, isShow }) => {
  const { assignment, technicians, loading, fetchTechnicians, addAssignment } =
    useAssignment(ticketId);
  const { dialog, openDialog, closeDialog } = useDialog();

  const handleOpenDialog = () => {
    fetchTechnicians();
    openDialog(ticketId);
  };

  const schema = yup.object().shape({
    technician_id: yup.number().required("Technician is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addAssignment(data);
    closeDialog();
    onReload();
  };

  useEffect(() => {
    if (assignment && assignment.technician) {
      setValue("technician_id", assignment.technician.id);
    }
  }, [assignment]);

  return (
    <>
      {isShow && (
        <Button
          type="button"
          size="sm"
          className="bg-gray-400 text-white"
          onClick={() => handleOpenDialog()}
        >
          Assign to a new technician
        </Button>
      )}
      <Dialog
        open={dialog !== null}
        onOpenChange={(isOpen) => (isOpen ? null : closeDialog())}
      >
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Assign Technician</DialogTitle>
              <DialogDescription>
                Assign a technician responsible for this ticket
              </DialogDescription>
            </DialogHeader>
            {loading ? (
              <Spinner size="medium" />
            ) : (
              <div className="grid gap-4 py-4">
                {dialog !== null && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Controller
                      id="technician_id"
                      name="technician_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <Label
                            id="technician_id"
                            htmlFor="technician_id"
                            className="text-right"
                          >
                            Member
                          </Label>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a technician" />
                          </SelectTrigger>
                          <SelectContent>
                            {technicians.map((technician, key) => (
                              <SelectItem
                                key={key}
                                value={technician.id.toString()}
                              >
                                {technician.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorMessage errors={errors} name="technician_id" />
                  </div>
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
    </>
  );
};

export default AssignTicketButton;
