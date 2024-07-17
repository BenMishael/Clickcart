import matplotlib.pyplot as plt
import pandas as pd
import matplotlib.dates as mdates

# Define the work plan data
data = {
    'Task': [
        'Project Initiation', 
        'Requirements Gathering and Analysis', 
        'System Design', 
        'Development Phase 1: Client Application', 
        'Development Phase 2: Server and Database', 
        'Development Phase 3: Admin Panel', 
        'Testing and Quality Assurance', 
        'Deployment and Launch'
    ],
    'Start Date': [
        '2024-03-01', 
        '2024-03-08', 
        '2024-03-22', 
        '2024-04-06', 
        '2024-05-21', 
        '2024-06-11', 
        '2024-06-25', 
        '2024-07-03'
    ],
    'End Date': [
        '2024-03-07', 
        '2024-03-21', 
        '2024-04-05', 
        '2024-05-20', 
        '2024-06-10', 
        '2024-06-24', 
        '2024-07-02', 
        '2024-07-07'
    ]
}

# Create a DataFrame
df = pd.DataFrame(data)
df['Start Date'] = pd.to_datetime(df['Start Date'])
df['End Date'] = pd.to_datetime(df['End Date'])

# Reverse the DataFrame to start from the top and go low
df = df.iloc[::-1]

# Plotting the Gantt chart
fig, ax = plt.subplots(figsize=(10, 6))

# Create a color palette
colors = plt.cm.tab10.colors

# Plot each task
for i, task in enumerate(df.itertuples(), 1):
    ax.barh(task.Task, (task._3 - task._2).days, left=task._2, color=colors[i % len(colors)])

# Formatting the chart
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
ax.set_xlabel('Date')
ax.set_ylabel('Tasks')
ax.set_title('Work Plan Gantt Chart')
plt.xticks(rotation=45)
plt.grid(True)

# Save the plot
plt.tight_layout()
plt.savefig("Work_Plan_Gantt_Chart.png")
plt.show()
