import { AxiosResponse } from "axios";
import FormInput from "./FormInput";

export default function EmployeeLinkForm({
  dialog,
  selectedUser,
  control,
  errors,
  fetchCallback,
}: {
  dialog: any;
  selectedUser: any;
  control: any;
  errors: any;
  fetchCallback?: (name: string, inputValue: any) => Promise<AxiosResponse>;
}) {
  return (
    <div className="w-full h-full text-black dark:text-white">
      <div className="w-full font-bold h-12 flex flex-row items-center justify-between text-black border-1 border-b border-gray-300">
        <div className="w-1/3">Name</div>
        <div className="w-1/3">Email</div>
      </div>
      <div
        key={selectedUser?.id}
        className="w-full h-12 mb-4 flex flex-row items-center justify-between text-black"
      >
        <div className="w-1/3">{dialog.data ? dialog.data.name : ""}</div>
        <div className="w-1/3">{dialog.data ? dialog.data.email : ""}</div>
      </div>
      <h2>Create Employee Record</h2>
      <div>
        <div className="grid gap-4 md:grid-cols-4 dark:bg-gray-800  bg-white p-4 rounded shadow-md overflow-visible z-50">
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              type="text"
              label="First Name"
              name="employee.firstName"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              type="text"
              label="Last Name"
              name="employee.lastName"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="date"
              name="employee.dateOfBirth"
              control={control}
              label="Date Of Birth"
              labelClass="block text-sm font-medium text-gray-700"
              required
            />
            {/* <Controller
                  name="employee.dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                /> */}
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="select"
              name="employee.gender"
              label="Gender"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
              options={["male", "female"]}
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              name="employee.title"
              type="text"
              label="Title"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              name="employee.email"
              type="text"
              label="Email"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
              required
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="date"
              name="employee.hiredAt"
              label="Hired At"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
              required
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="date"
              name="employee.lastDayWorkedAt"
              control={control}
              label="Last Day Worked At"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              type="text"
              name="employee.mobile"
              label="Mobile"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
              required
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              type="text"
              name="employee.phone"
              label="Phone"
              control={control}
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              type="text"
              name="employee.address"
              control={control}
              label="Address"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              type="text"
              name="employee.positionTitle"
              control={control}
              label="Position Title"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="typedSelect"
              name="employee.department"
              type="text"
              control={control}
              callback={fetchCallback}
              label="Department"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="typedSelect"
              name="employee.manager"
              type="text"
              callback={fetchCallback}
              control={control}
              label="Manager"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="input"
              // name="email"
              type="number"
              // control={control}
              name="employee.holidayAllowance"
              label="Holiday Allowance"
              step="0.5"
              min="0"
              max="100"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="typedSelect"
              name="employee.subordinates"
              callback={fetchCallback}
              type="text"
              control={control}
              label="Subordinates"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
          <div>
            <FormInput
              className="mt-1 block dark:bg-gray-700 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              inputType="typedSelect"
              name="employee.Company"
              type="text"
              control={control}
              callback={fetchCallback}
              label="Company"
              labelClass="block text-sm font-medium text-gray-700"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-right sm:px-6">
        {Object.keys(errors).length != 0 && (
          <p className="text-red-500">please fill all required fields</p>
        )}
      </div>
    </div>
  );
}
