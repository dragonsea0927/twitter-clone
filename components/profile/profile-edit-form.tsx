import React, { useState } from "react";
import Modal from "../ui/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { useForm } from "react-hook-form";
import { profileEditSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/types";
import { Input } from "../ui/input";
import axios from "axios";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";

interface Props {
  data: IUser;
}

const ProfileEditForm = ({ data }: Props) => {
  const [error, setError] = useState("");
  const editModal = useEditModal();

  const { mutate: mutateUser } = useUser({ userId: data._id });
   

  const form = useForm<z.infer<typeof profileEditSchema>>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: data.name || "",
      username: data.username || "",
      bio: data.bio || "",
      location: data.location || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileEditSchema>) {
    try {
      await axios.put(`/api/users/${data._id}?type=updateFields`, values);
      mutateUser();
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }finally{
        mutateUser();
        editModal.onClose();
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} size={"csize"}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
