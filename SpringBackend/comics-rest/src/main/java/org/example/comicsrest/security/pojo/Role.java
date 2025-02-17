package org.example.comicsrest.security.pojo;

import lombok.NoArgsConstructor;
import org.example.comicsrest.security.enums.RoleType;

import java.util.Objects;

@NoArgsConstructor
public class Role {

    private String roleName;

    public Role(RoleType roleType) {
        this.roleName = roleResolver(roleType);
    }

    public String roleResolver(RoleType roleType) {
        switch (roleType) {
            case Dev : return "ROLE_DEV";
            case Admin : return "ROLE_ADMIN";
            case User : return "ROLE_USER";
            default: return "ROLE_UNKNOWN";
        }
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(roleName, role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(roleName);
    }
}
