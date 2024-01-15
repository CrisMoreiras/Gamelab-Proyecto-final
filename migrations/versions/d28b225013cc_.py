"""empty message

Revision ID: d28b225013cc
Revises: 4214bb91dea2
Create Date: 2024-01-14 21:14:39.304282

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd28b225013cc'
down_revision = '4214bb91dea2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('consoles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=180), nullable=False),
    sa.Column('company', sa.String(length=180), nullable=False),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('consoles')
    # ### end Alembic commands ###