import React from "react";

const Reminder = () => {
  const data = [
    {
      description: "Urgent Safety Recall",
      dueDate: "06/04/2022",
      overdue: "08/04/2022",
      notify: "David Demo",
      status: "Completed",
    },
    {
      description: "Urgent Safety Recall",
      dueDate: "06/04/2022",
      overdue: "08/04/2022",
      notify: "David Demo",
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col justify-center dark:bg-charcoal_black bg-pure_white py-4 px-5 rounded-[14px] max-lg:hidden transition-all duration-300">
      <div className="flex items-center justify-between ">
        <h1 className="dark:text-pure_white text-black leading-[23.44px] text-[18px] font-medium  ">
          Reminder
        </h1>
        <button className=" text-pure_white py-[6px] px-3 bg-amethyst_purple rounded-[6px]  ">
          + Add New
        </button>
      </div>
      <span className="dark:bg-gunmetal_gray bg-light_off_white h-[1px] w-full my-[14px] "></span>

      <div className=" overflow-x-auto  ">
        <div className="min-w-[600px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="dark:text-cool_gray text-dove_gray text-sm font-medium">
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Due Date</th>
                <th className="p-2 text-left">Overdue</th>
                <th className="p-2 text-left">Notify</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-b-gunmetal_gray text-charcoal_black text-sm"
                >
                  <td className="dark:text-light_gray_blue p-2 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="dark:text-light_gray_blue p-2 whitespace-nowrap">
                    {item.dueDate}
                  </td>
                  <td className="dark:text-light_gray_blue p-2 whitespace-nowrap">
                    {item.overdue}
                  </td>
                  <td className="dark:text-light_gray_blue p-2 whitespace-nowrap">
                    {item.notify}
                  </td>
                  <td className="dark:text-light_gray_blue p-2 whitespace-nowrap">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
