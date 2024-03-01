'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
// TODO: make it dynamic
import { useState } from 'react';

import AssignmentEditDialog from '@/components/features/course/assignment/assigment-edit-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateAssignment } from '@/hooks/assignment-hook';
import {
  AssignmentSchema,
  UpdateAssignmentForm,
} from '@/types/schema/assignment-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AssigmentRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const assignment = AssignmentSchema.parse(row.original);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: updateAssignment, isError: isUpdateError } =
    useUpdateAssignment();

  const onDelete = () => {};

  const onSubmitEdit = (values: UpdateAssignmentForm) => {
    updateAssignment(values);
    // if (!isUpdateError) {
    //   setIsEditDialogOpen(false);
    // }
  };

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <AssignmentEditDialog
          onSubmit={onSubmitEdit}
          defaultValues={{
            id: assignment.id,
            description: assignment.description,
            expectedPassingStudentPercentage:
              assignment.expectedPassingStudentPercentage,
            expectedScorePercentage: assignment.expectedScorePercentage,
            maxScore: assignment.maxScore,
            name: assignment.name,
            weight: assignment.weight,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>
              {`You can't undo this action. This will permanently delete the.`}
            </DialogDescription>
          </DialogHeader>
          {/* 
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}>Delete</Button>
          </DialogFooter> */}
        </DialogContent>
      )}
    </Dialog>
  );
}
