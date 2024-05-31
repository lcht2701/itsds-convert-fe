import React from "react";
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
import { Button } from "@/components/ui/button";
import useTicketTask from "@/hooks/ticketTask/useTicketTask";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { InputDateFormatter } from "@/utils/InputDateFormatter";

export function CreateTicketTaskDialog({
  isOpen,
  onCancel,
  ticketId,
  onReload,
}) {
  const { addTicketTask, loading } = useTicketTask(ticketId);
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .max(1024, "Title must be at most 1024 characters"),
    description: yup
      .string()
      .nullable()
      .max(5000, "Description must be at most 5000 characters"),
    priority: yup.number().required("Priority is required"),
    start_time: yup.date().required("Start time is required"),
    note: yup
      .string()
      .nullable()
      .max(5000, "Note must be at most 5000 characters"),
    end_time: yup.date().nullable(),
    progress: yup
      .number()
      .default(0)
      .min(0, "Progress must be at least 0")
      .max(100, "Progress must be at most 100"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (data.start_time) {
      data.start_time = InputDateFormatter(data.start_time);
    }
    if (data.end_time) {
      data.end_time = InputDateFormatter(data.end_time);
    }
    addTicketTask(data);
    onCancel();
    onReload();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => (isOpen ? null : onCancel())}
    >
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
            <DialogDescription>Add a new task</DialogDescription>
          </DialogHeader>
          {loading ? (
            <Spinner size="medium" />
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  type="text"
                  className="col-span-3"
                  {...register("title")}
                />
                <ErrorMessage errors={errors} name="title" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  className="col-span-3"
                  {...register("description")}
                />
                <ErrorMessage errors={errors} name="description" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="col-span-1">
                  Priority
                </Label>
                <div className="col-span-3">
                  <Controller
                    id="priority"
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select priority ..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"0"}>Low</SelectItem>
                          <SelectItem value={"1"}>Medium</SelectItem>
                          <SelectItem value={"2"}>High</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <ErrorMessage errors={errors} name="priority" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start_time" className="col-span-1">
                  Start Date
                </Label>
                <div className="col-span-3">
                  <Controller
                    id="start_time"
                    name="start_time"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={
                              ("w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground")
                            }
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date().setHours(0, 0, 0, 0)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <ErrorMessage errors={errors} name="start_time" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  name="note"
                  className="col-span-3"
                  {...register("note")}
                />
                <ErrorMessage errors={errors} name="note" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end_time">End Date</Label>
                <div className="col-span-3">
                  <Controller
                    id="end_time"
                    name="end_time"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={
                              ("w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground")
                            }
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date().setHours(0, 0, 0, 0)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <ErrorMessage errors={errors} name="end_time" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="progress">Progress</Label>
                <div className="col-span-3">
                  <Controller
                    id="progress"
                    name="progress"
                    control={control}
                    className="col-span-3"
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[0]}
                          onValueChange={field.onChange}
                        />
                        <p className="font-semibold">{field.value}</p>
                      </div>
                    )}
                  />
                </div>
                <ErrorMessage errors={errors} name="progress" />
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
