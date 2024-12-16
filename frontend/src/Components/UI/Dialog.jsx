// components/ui/dialog.jsx
import React from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { clsx } from 'clsx';

// Dialog Component
const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onOpenChange}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto w-full">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[60%] sm:max-w-none sm:p-6">
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
};

// Subcomponents
const DialogContent = ({ children, className }) => {
  return (
    <div className={clsx('mt-2', className)}>
      {children}
    </div>
  );
};

const DialogHeader = ({ children }) => {
  return <div className="sm:flex sm:items-start">{children}</div>;
};

const DialogTitle = ({ children }) => {
  return (
    <HeadlessDialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
      {children}
    </HeadlessDialog.Title>
  );
};

const DialogDescription = ({ children }) => {
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">{children}</p>
    </div>
  );
};

const DialogFooter = ({ children }) => {
  return <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">{children}</div>;
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};