import React, { useState } from 'react';
import { departments } from './department';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Checkbox,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleClick = (department: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department],
    }));
  };

  const handleSelect = (name: string, isSubDepartment: boolean, parent: string) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected, [name]: !prevSelected[name] };

      if (!isSubDepartment) {
        // Select/deselect all sub-departments
        const subDepts = departments.find((dept) => dept.department === name)?.sub_departments || [];
        subDepts.forEach((subDept) => {
          newSelected[subDept] = newSelected[name];
        });
      } else {
        // If all sub-departments are selected, select the department
        const parentDept = departments.find((dept) => dept.department === parent);
        if (parentDept) {
          const allSelected = parentDept.sub_departments.every((subDept) => newSelected[subDept]);
          newSelected[parent] = allSelected;
        }
      }

      return newSelected;
    });
  };

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Departments
          </Typography>
          <List>
            {departments.map((dept) => (
              <Box key={dept.department}>
                <ListItem>
                  <IconButton edge="start" onClick={() => handleClick(dept.department)}>
                    {open[dept.department] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <Checkbox
                    edge="start"
                    checked={!!selected[dept.department]}
                    onChange={() => handleSelect(dept.department, false, '')}
                  />
                  <ListItemText primary={dept.department} />
                </ListItem>
                <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {dept.sub_departments.map((subDept) => (
                      <ListItem key={subDept} sx={{ pl: 4 }}>
                        <Checkbox
                          edge="start"
                          checked={!!selected[subDept]}
                          onChange={() => handleSelect(subDept, true, dept.department)}
                        />
                        <ListItemText primary={subDept} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DepartmentList;
