import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStrictForm } from '@/hooks/form-hook';
import {
  CreateStudentDefaultValues,
  CreateStudentSchema,
  CreateStudentType,
} from '@/types/schema/studen-schema';

type StudentDialogProps = {
  onSubmit: (values: CreateStudentType) => void;
  defaultValues?: CreateStudentType;
  isEdit?: boolean;
};

const StudentAddDialog: React.FC<StudentDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateStudentSchema,
    defaultValues ?? CreateStudentDefaultValues,
  );

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the student information'
              : 'Fill in the student information'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>StudentId</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => form.reset()} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default StudentAddDialog;
