#!/bin/bash

# Enable SSH password authentication and root login
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/g' /etc/ssh/sshd_config
sed -i 's/#PermitRootLogin yes/PermitRootLogin yes/g' /etc/ssh/sshd_config

# Restart SSH service
systemctl restart sshd

# Set a root password
echo "root:PASSWORD_PLACEHOLDER" | chpasswd

echo "ROOT PASSWORD: $PASSWORD"