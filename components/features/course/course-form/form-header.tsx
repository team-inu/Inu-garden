'use client';

import { ImportIcon, TimerIcon } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tableToObject, worksheetToTables } from '@/libs/excel';
import { CreateCourseSchemaValues } from '@/types/schema/course-schema';

const CourseFormHeader = () => {
  const formCtx = useFormContext<CreateCourseSchemaValues>();
  const fileImportRef = useRef<HTMLInputElement>(null);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return toast.error('Can not read file');
    }

    const buffer = await file.arrayBuffer();
    const workBook = XLSX.read(buffer, { type: 'buffer' });

    const sheet1 = workBook.Sheets[workBook.SheetNames[0]];

    const [infoTable, CLOTable] = await worksheetToTables(sheet1);

    const [info] = tableToObject(infoTable[0], infoTable.slice(1));
    const clo = tableToObject(CLOTable[0], CLOTable.slice(1));

    // TODO: i think this will be boommmm
    formCtx.reset({
      name: info['CourseTitle'],
      code: info['_CourseID'],
      semesterId: info['Semester'],
      userId: 'a',
      description: '',
    });
  };

  return (
    <div className="space-x-5">
      <Input
        type="file"
        className="hidden"
        ref={fileImportRef}
        onChange={handleUpload}
      />
      <Button
        variant={'secondary'}
        className="space-x-3"
        onClick={() => fileImportRef.current?.click()}
      >
        <ImportIcon className="h-5 w-5" />
        <div className="">Import</div>
      </Button>
      <Link href="/course/history">
        <Button type="button" variant={'secondary'} className="space-x-3">
          <TimerIcon className="h-5 w-5" />
          <div className="">History</div>
        </Button>
      </Link>
    </div>
  );
};

export default CourseFormHeader;
